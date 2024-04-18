import AutoModeIcon from '@mui/icons-material/AutoMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import { Box, Button, DialogContent, DialogTitle, Divider, Drawer, FormHelperText, FormLabel, IconButton, ModalClose, Sheet, Slider, Stack, ToggleButtonGroup, Tooltip, Typography, useColorScheme } from "@mui/joy";
import { useEffect, useState } from 'react';
import { HuePicker } from 'react-color';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { openSettingsState } from '../atoms/openSettingsState';
import ModalDialogCustom from '../components/ModalDialog';
import { useEditColorProvider } from '../providers/ThemeProvider';
import { useMyNavigate } from '../utility/useMyNavigate';

export default function Settings() {
    const [open, setOpen] = useRecoilState(openSettingsState);
    const { mode, setMode } = useColorScheme();
    const { primaryColor, setPrimaryColor, setSolidColor, solidColor } = useEditColorProvider()
    const navigate = useMyNavigate();
    const location = useLocation();
    const [openYouSure, setOpenYouSure] = useState(false)
    const [autoTime, setAutoTime] = useState(localStorage.getItem('auto_forward_second') ? parseInt(localStorage.getItem('auto_forward_second')!) : 1)

    useEffect(() => {
        // Debouncing
        const setAuto = setTimeout(() => {
            localStorage.setItem('auto_forward_second', autoTime.toString())
        }, 500)

        return () => {
            clearTimeout(setAuto)
        }
    }, [autoTime])


    return (
        <>
            <Drawer
                size="md"
                variant="plain"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    content: {
                        sx: {
                            bgcolor: 'transparent',
                            p: { md: 3, sm: 0 },
                            boxShadow: 'none',
                        },
                    },
                }}
            >
                <Sheet
                    sx={{
                        borderRadius: 'md',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <DialogTitle>Settings</DialogTitle>
                    <ModalClose />
                    <Divider sx={{ mt: 'auto' }} />
                    <DialogContent sx={{ gap: 2 }}>
                        <Typography level="title-md" fontWeight="bold">
                            Dialogues
                        </Typography>
                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                Auto Forward Time
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                Choose the time in seconds before the dialogue auto-forwards.
                            </FormHelperText>
                        </Box>
                        <Box
                            sx={{
                                paddingX: 3,
                            }}
                        >
                            <Slider
                                defaultValue={autoTime}
                                getAriaValueText={(value) => `${value}s`}
                                step={1}
                                marks={[
                                    {
                                        value: 1,
                                        label: '1s',
                                    },
                                    {
                                        value: 10,
                                        label: '10s',
                                    },
                                ]}
                                valueLabelDisplay="on"
                                max={10}
                                min={1}
                                onChange={(_, value) => {
                                    if (value)
                                        setAutoTime(value as number)
                                }}
                            />
                        </Box>

                        <Typography level="title-md" fontWeight="bold">
                            Theme
                        </Typography>
                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                Theme mode
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                Choose between light, dark, or system theme mode.
                            </FormHelperText>
                        </Box>
                        <ToggleButtonGroup
                            value={mode}
                            onChange={(_, newValue) => {
                                if (newValue)
                                    setMode(newValue)
                            }}
                        >
                            <Tooltip title="Light Mode">
                                <IconButton value="light">
                                    <LightModeIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="System Mode">
                                <IconButton value="system">
                                    <AutoModeIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Dark Mode">
                                <IconButton value="dark">
                                    <DarkModeIcon />
                                </IconButton>
                            </Tooltip>
                        </ToggleButtonGroup>

                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                Primary color
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                Choose the primary color for the theme.
                            </FormHelperText>
                        </Box>
                        <Box
                            sx={{
                                paddingX: 3,
                            }}
                        >
                            <HuePicker
                                width='99%'
                                color={primaryColor}
                                onChange={(color) => setPrimaryColor(color.hex)}
                                styles={{
                                    default: {
                                        picker: {
                                            minHeight: '15px',
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                Solid Color
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                Choose the solid color for the theme. It can be black or white and will be contrasting with the primary color.
                                So if the primary color is dark, the solid color will be white, and a the other way around.
                            </FormHelperText>
                        </Box>
                        <ToggleButtonGroup
                            value={solidColor}
                            onChange={(_, newValue) => {
                                if (newValue)
                                    setSolidColor(newValue)
                            }}
                        >
                            <Tooltip title="White">
                                <IconButton value="white">
                                    <WbIncandescentIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Black">
                                <IconButton value="black">
                                    <ModeNightIcon />
                                </IconButton>
                            </Tooltip>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup
                            color="primary"
                            variant="solid"
                        >
                            <Button>Example</Button>
                        </ToggleButtonGroup>
                    </DialogContent>
                    {location.pathname !== '/' && <>
                        <Divider sx={{ mt: 'auto' }} />
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            useFlexGap
                            spacing={1}
                        >
                            <Button
                                variant="outlined"
                                color="danger"
                                startDecorator={<ExitToAppIcon />}
                                onClick={() => setOpenYouSure(true)}
                            >
                                Return to main menu
                            </Button>
                        </Stack>
                    </>}
                </Sheet>
            </Drawer>

            <ModalDialogCustom
                open={openYouSure}
                setOpen={setOpenYouSure}
                color='danger'
                head={<Typography level="h4"
                    startDecorator={<ExitToAppIcon />}
                >
                    Attention
                </Typography>}
                actions={<>
                    <Button
                        key={'exit'}
                        color='danger'
                        variant="outlined"
                        onClick={() => {
                            navigate('/')
                            setOpen(false)
                            setOpenYouSure(false)
                        }}
                        startDecorator={<ExitToAppIcon />}
                    >
                        Exit
                    </Button>
                    <Button
                        key={'cancel'}
                        color="neutral"
                        variant="plain"
                        onClick={() => setOpenYouSure(false)}
                    >
                        Cancel
                    </Button>
                </>}
            >
                <Typography>
                    Are you sure you want to return to the main menu? All unsaved progress will be lost.
                </Typography>
            </ModalDialogCustom>
        </>
    );
}
