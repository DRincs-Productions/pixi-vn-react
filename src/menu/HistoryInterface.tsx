import { CharacterModelBase, getCharacterById, getDialogueHistory } from '@drincs/pixi-vn';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Chip, CssVarsProvider, IconButton, Input, Sheet, Stack, Typography } from "@mui/joy";
import Avatar from '@mui/joy/Avatar';
import { useState } from 'react';

export default function HistoryInterface() {
    const [searchString, setSearchString] = useState("")

    return (
        <CssVarsProvider disableTransitionOnChange>
            <Sheet
                component="main"
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "auto",
                    gridTemplateRows: "auto 1fr auto",
                    pointerEvents: "auto",
                }}
            >
                <IconButton
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        m: 2,
                    }}
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Stack
                    sx={{
                        px: 2,
                        py: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Stack sx={{ mb: 2 }}>
                        <Typography level="h2">History</Typography>
                    </Stack>
                    <Input
                        placeholder="Search"
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        startDecorator={<SearchRoundedIcon />}
                        aria-label="Search"
                    />
                </Stack>
                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        minHeight: 0,
                        px: 2,
                        py: 3,
                        overflowY: 'scroll',
                        flexDirection: 'column-reverse',
                    }}
                >
                    <Stack spacing={2} justifyContent="flex-end">
                        {getDialogueHistory()
                            .map((step) => {
                                let character = step.dialoge?.characterId ? getCharacterById(step.dialoge?.characterId) ?? new CharacterModelBase(step.dialoge?.characterId, { name: step.dialoge?.characterId }) : undefined
                                return {
                                    character: character?.name ? character.name + (character.surname ? " " + character.surname : "") : undefined,
                                    text: step.dialoge?.text,
                                    icon: character?.icon,
                                    choices: step.choices?.map((choice) => {
                                        return {
                                            text: choice.text,
                                            isResponse: choice.label === step.choiceMade?.label,
                                        }
                                    }),
                                }
                            })
                            .filter((data) => {
                                if (!searchString) return true
                                return data.character?.toLowerCase().includes(searchString.toLowerCase()) || data.text?.toLowerCase().includes(searchString.toLowerCase())
                            })
                            .map((data, index) => {
                                return <>
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        key={"text" + index}
                                    >
                                        <Avatar
                                            size="sm"
                                            src={data.icon}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            {data.character && <Typography level="title-sm">{data.character}</Typography>}
                                            <Typography level="body-sm">{data.text}</Typography>
                                        </Box>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={0.5}
                                        key={index}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            {data.choices && data.choices.map((choice, index) => {
                                                if (choice.isResponse) {
                                                    return <Chip
                                                        color="success"
                                                        endDecorator={<CheckIcon />}
                                                    >
                                                        {choice.text}
                                                    </Chip>
                                                }
                                                return <Chip
                                                    key={"choices" + index}
                                                    color="primary"
                                                >
                                                    {choice.text}
                                                </Chip>
                                            })}
                                        </Box>
                                    </Stack>
                                </>
                            })}
                    </Stack>
                </Box>
            </Sheet>
        </CssVarsProvider >
    );
}
