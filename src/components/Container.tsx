import {ReactNode} from "react";

export const Container = ({children}: Props) => {
    return (
        <div className="w-full flex justify-center">
            <div className="h-full max-w-7xl mt-12 px-8">{children}</div>
        </div>
    );
};
type Props = {
    children: | ReactNode | ReactNode[];
};
