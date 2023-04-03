import { IError } from "../../types";
import { Title } from "@mantine/core";

interface IErrorModalProps {
    error: IError;
}

function ErrorModal({ error }: IErrorModalProps) {
    return (
        <>
            <Title order={3}>{error.message}</Title>
        </>
    );
}

export default ErrorModal;
