
type TitleProps = {
  text:string;
}

const Title = ({text}:TitleProps) => {

  return (
    <h3 className="text-lg font-bold mb-2">
      {text}
    </h3>
  )
}

export default Title