import { Button, ButtonProps, ButtonTypeMap } from "@mui/joy";

interface DialogueMenuButtonProps extends ButtonProps<ButtonTypeMap['defaultComponent'], {
    component?: React.ElementType;
}> {
}

export default function DialogueMenuButton(props: DialogueMenuButtonProps) {
    const {
        sx,
        ...rest
    } = props;

    return (
        <Button
            size="sm"
            {...rest}
        />
    );
}
