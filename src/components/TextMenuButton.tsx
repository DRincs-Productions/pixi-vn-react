import { Link, LinkProps, LinkTypeMap, Typography, useTheme } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";

interface TextMenuButtonProps extends LinkProps<LinkTypeMap['defaultComponent'], {
    component?: React.ElementType;
    focusVisible?: boolean;
}> {
    to?: string;
    selected?: boolean;
}

export default function TextMenuButton(props: TextMenuButtonProps) {
    const {
        sx,
        children,
        disabled,
        selected,
        ...rest
    } = props;

    return (
        <Link
            sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem", lg: "1rem", xl: "1.1rem" },
                pointerEvents: "auto",
                ...sx
            }}
            component={RouterLink}
            disabled={disabled}
            {...rest}
        >
            <Typography
                textColor={
                    selected ? useTheme().palette.primary[500] :
                        disabled ? useTheme().palette.neutral[500] :
                            useTheme().palette.neutral[300]
                }
            >
                {children}
            </Typography>
        </Link>
    );
}
