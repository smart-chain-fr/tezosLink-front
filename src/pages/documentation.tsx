import Documentation from "@/components/Layouts/Documentation";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

type IProps = {
  menu: string;
  content: string;
};

export default function Route(props: IProps) {
  return <Documentation {...props} />;
}

export async function getStaticProps() {

  const docsDirectory = path.join(process.cwd(), 'src/assets/docs');
  const contentFilePath = `${docsDirectory}/content.md`;
  const menuFilePath = `${docsDirectory}/menu.md`

  const contentFile = fs.readFileSync(contentFilePath, "utf8");
  const menuFile = fs.readFileSync(menuFilePath, "utf8");

  const content = matter(contentFile);
  const menu = matter(menuFile);

  return {
    props: {
      content: content.content,
      menu: menu.content,
    },
  };
}
