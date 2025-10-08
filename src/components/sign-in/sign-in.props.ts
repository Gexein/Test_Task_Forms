import type { HTMLAttributes } from "react";

export interface SignInFormProps extends HTMLAttributes<HTMLDivElement> {
    sign: () => void;
}