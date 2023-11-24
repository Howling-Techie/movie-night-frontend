import {ReactNode} from "react";

export const Container = ({children}: Props) => {
    return (
        <div className="h-full flex-col flex items-center mt-12">{children}</div>
    );
};
type Props = {
    children: | ReactNode | ReactNode[];
};
