import React from "react";

type IProps = {
    title: string;
}

export const Title:React.FC<IProps> = ({title}) => {
    return <h1 className="font-semibold  text-2xl">
        {title}
    </h1>
}