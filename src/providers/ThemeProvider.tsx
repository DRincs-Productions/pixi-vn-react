import { CssVarsProvider, extendTheme } from '@mui/joy';
import { createContext, useContext, useMemo, useState } from 'react';
import ShadeGenerator from 'shade-generator';

type Iprops = {
    children: React.ReactNode
}
type solidColor = "black" | "white"

const ColorContext = createContext<{
    primaryColor: string,
    setPrimaryColor: (color: string) => void,
    solidColor: solidColor,
    setSolidColor: (color: solidColor) => void,

}>({
    primaryColor: "",
    setPrimaryColor: () => { },
    solidColor: "white",
    setSolidColor: () => { },
})

export function useEditColorProvider() {
    const context = useContext(ColorContext);
    if (context === undefined) {
        throw new Error("usePrimaryColorProvider must be used within a PrimaryColorProvider")
    }
    return context;
}

/**
 * Get 10 shades of a color based on the color you pass in.
 * @param color 
 * @example
 * If you pass in a color of '#03a9f4', you will get the following shades:
 * {
 *     "50": "#e1f5fe",
 *     "100": "#b3e5fc",
 *     "200": "#81d4fa",
 *     "300": "#4fc3f7",
 *     "400": "#29b6f6",
 *     "500": "#03a9f4",
 *     "600": "#039be5",
 *     "700": "#0288d1",
 *     "800": "#0277bd",
 *     "900": "#01579b"
 * }
 */
function get10ColorShades(color: string) {
    return {
        "50": ShadeGenerator.hue(color).shade("10").hex(),
        "100": ShadeGenerator.hue(color).shade("20").hex(),
        "200": ShadeGenerator.hue(color).shade("40").hex(),
        "300": ShadeGenerator.hue(color).shade("60").hex(),
        "400": ShadeGenerator.hue(color).shade("80").hex(),
        "500": ShadeGenerator.hue(color).shade("100").hex(),
        "600": ShadeGenerator.hue(color).shade("200").hex(),
        "700": ShadeGenerator.hue(color).shade("300").hex(),
        "800": ShadeGenerator.hue(color).shade("400").hex(),
        "900": ShadeGenerator.hue(color).shade("500").hex(),
    }
}

export default function MyThemeProvider({ children }: Iprops) {
    const [primaryColor, setPrimaryColor] = useState('#1c73ff')
    const [solidColor, setSolidColor] = useState<solidColor>("white")


    // Build the theme: https://mui.com/joy-ui/customization/theme-builder
    const theme = useMemo(() => {
        let colors = get10ColorShades(primaryColor)
        return extendTheme({
            colorSchemes: {
                light: {
                    palette: {
                        primary: {
                            ...colors,
                            solidColor: solidColor === "black" ? "var(--joy-palette-common-black)" : "var(--joy-palette-common-white)",
                        },
                    },
                },
                dark: {
                    palette: {
                        primary: {
                            ...colors,
                            solidColor: solidColor === "black" ? "var(--joy-palette-common-black)" : "var(--joy-palette-common-white)",
                        },
                    },
                },
            },
        })
    }, [primaryColor, solidColor])

    return (
        <CssVarsProvider
            theme={theme}
        >
            <ColorContext.Provider value={{
                primaryColor: primaryColor,
                setPrimaryColor: setPrimaryColor,
                solidColor: solidColor,
                setSolidColor: setSolidColor,
            }}>
                {children}
            </ColorContext.Provider>
        </CssVarsProvider>
    );
}
