import { formatCurrency } from "@/utils/format";

type FormRowProps = {
  label: string;
  amount: number;
}

const FormRow = ({ label, amount }: FormRowProps) => {
  return (
    <p className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  )
}

export default FormRow