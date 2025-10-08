import type { HTMLAttributes } from "react";

export interface CodeInFormProps extends HTMLAttributes<HTMLDivElement> {
    pass: () => void;
    getBack: () => void
}