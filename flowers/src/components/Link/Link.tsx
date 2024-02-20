import { isJsxElement } from "typescript";
import styles from "./Link.module.scss";

interface ILinkProps {
  route?: string;
  name: string;
  style?: string;
}

export const Link = ({ route, name, style }: ILinkProps): JSX.Element => {
  return (
    <a className={style} href={route}>
      {name}
    </a>
  );
};
