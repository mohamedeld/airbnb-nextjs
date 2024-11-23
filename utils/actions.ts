"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {
  createProfileSchema,
  imageSchema,
  propertySchema,
  validateWithZodSchema,
} from "./schemas";
import prisma from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./supabase";
import { PropertyCardProps } from "./types";

export const getAuthUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("user not found");
    }
    if (!user?.privateMetadata?.hasProfile) {
      redirect("/profile/create");
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Please login to create a profile");
    }
    const rowData = Object.fromEntries(formData);
    const validateFields = createProfileSchema.parse(rowData);
    await prisma.profile.create({
      data: {
        clerkId: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
        profileImage: user?.imageUrl ?? "",
        ...validateFields,
      },
    });
    // need to connect my profile with clerk profile
    await clerkClient.users.updateUserMetadata(user?.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return {
      message: error instanceof Error ? error?.message : "there was an error",
    };
  }
  redirect("/");
};

export const fetchProfileImage = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("there is no user found");
    }
    const profile = await prisma.profile.findUnique({
      where: {
        clerkId: user?.id,
      },
      select: {
        profileImage: true,
      },
    });
    return profile?.profileImage;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = prisma.profile.findUnique({
    where: {
      clerkId: user?.id,
    },
  });
  if (!profile) {
    redirect("/profile/create");
  }
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const validateFields = createProfileSchema.safeParse(rawData);
    if (!validateFields?.success) {
      const errors = validateFields?.error.errors?.map(
        (error) => error?.message
      );
      throw new Error(errors?.join(","));
    }
    await prisma.profile.update({
      where: {
        clerkId: user?.id,
      },
      data: validateFields?.data,
    });
    revalidatePath("/profile");
    return {
      message: "Updated profile successfully",
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error?.message : "Something went wrong",
    };
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const image = formData.get("image") as File;
    // const validateFields = validateWithZodSchema(imageSchema,{image});
    const fullPath = await uploadImage(image);

    await prisma?.profile?.update({
      where: {
        clerkId: user?.id,
      },
      data: {
        profileImage: fullPath,
      },
    });

    revalidatePath("/profile");
    return {
      message: "image updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      message: error instanceof Error ? error?.message : "Something went wrong",
    };
  }
};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  if (!user) {
    redirect("/");
  }
  try {
    const rowData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validateFields = validateWithZodSchema(propertySchema, rowData);
    // const validatedFile = validateWithZodSchema(imageSchema,{image:file});
    const fullPath = await uploadImage(file);

    await prisma.property.create({
      data: {
        ...validateFields,
        image: fullPath,
        profileId: user.id,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return {
      message: error instanceof Error ? error?.message : "Something went wrong",
    };
  }
  redirect("/");
};

type fetchPropertiesProps = {
  search?: string;
  category?: string;
};

export const fetchProperties = async ({
  search = "",
  category,
}: fetchPropertiesProps) => {
  try {
    const properties = await prisma.property.findMany({
      where: {
        category,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { tagline: { contains: search, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        tagline: true,
        country: true,
        price: true,
        image: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return properties as PropertyCardProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

type FetchFavoritesProps = {
  propertyId: string;
};
export const fetchFavorite = async ({ propertyId }: FetchFavoritesProps) => {
  const user = await getAuthUser();
  try {
    const favorite = await prisma.favorite.findFirst({
      where: {
        propertyId,
        profileId: user?.id,
      },
      select: {
        id: true,
      },
    });
    return favorite?.id || null;
  } catch (error) {
    console.log(error);
  }
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("please login");
  }
  try {
    const { propertyId, favoriteId, pathname } = prevState;
    if (favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await prisma.favorite.create({
        data: {
          propertyId,
          profileId: user?.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Removed from favorites" : "Added to favorites",
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error?.message : "something went wrong",
    };
  }
};

export const fetchFavorites = async () => {
  try {
    const user = await getAuthUser();
    if (!user) {
      throw new Error("Plase login");
    }
    const favorites = await prisma.favorite.findMany({
      where: {
        profileId: user?.id,
      },
      select: {
        property: {
          select: {
            id: true,
            name: true,
            tagline: true,
            country: true,
            price: true,
            image: true,
          },
        },
      },
    });
    return favorites?.map((favorite) => favorite?.property);
  } catch (error) {
    console.log(error);
  }
};
