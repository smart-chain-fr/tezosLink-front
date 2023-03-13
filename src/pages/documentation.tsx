import Documentation from "@Front/components/Layouts/Documentation"


type IProps = {
  menu: string,
  content: string
}

export default function Route() {
  const data : IProps = {
    menu: "",
    content: ""
  }  
  return <Documentation {...data} />
}
