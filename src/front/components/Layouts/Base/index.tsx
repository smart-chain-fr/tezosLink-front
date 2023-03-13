import { FrontendVariables } from "@Front/config/VariablesFront";
import React from "react";

type _IProps = {};
type _IState = {};

export default class BasePage<IProps = _IProps, IState = _IState> extends React.Component<IProps, IState> {
    private static variables: FrontendVariables;
    constructor(props: IProps) {
        super(props);
        BasePage.variables ??= FrontendVariables.getInstance();
		console.log("BaseApiService.baseUrl",  BasePage.variables.NEXT_PUBLIC_API_URL);
    }   
}
