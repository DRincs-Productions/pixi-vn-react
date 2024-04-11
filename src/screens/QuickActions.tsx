import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Button, Grid, Typography } from '@mui/joy';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { afterLoadEventState } from '../atoms/afterLoadEventState';
import { canGoBackState } from '../atoms/canGoBackState';
import { openHistoryState } from '../atoms/openHistoryState';
import { openSettingsState } from '../atoms/openSettingsState';
import ModalDialogCustom from '../components/ModalDialog';
import TextMenuButton from '../components/TextMenuButton';
import { goBack, loadGameSave, quickLoadGame, quickSaveGame, saveGame } from '../utility/ActionsUtility';

export default function QuickActions() {
    const setOpenSettings = useSetRecoilState(openSettingsState);
    const setOpenHistory = useSetRecoilState(openHistoryState);
    const navigate = useNavigate();
    const canGoBack = useRecoilValue(canGoBackState)
    const notifyLoadEvent = useSetRecoilState(afterLoadEventState);
    const [openYouSure, setOpenYouSure] = useState(false)

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-end"
                spacing={2}
                sx={{
                    height: "100%",
                    width: "100%",
                    paddingLeft: { xs: 1, sm: 2, md: 4, lg: 6, xl: 8 },
                    position: "absolute",
                    marginBottom: 0,
                    bottom: 0,
                }}
            >
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => goBack(navigate, () => { notifyLoadEvent((prev) => prev + 1) })}
                        disabled={!canGoBack}
                    >
                        Back
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => setOpenHistory(true)}
                    >
                        History
                    </TextMenuButton>
                </Grid>
                {/* <Grid
                paddingY={0}
            >
                <TextMenuButton>
                    Skip
                </TextMenuButton>
            </Grid>
            <Grid
                paddingY={0}
            >
                <TextMenuButton>
                    Auto
                </TextMenuButton>
            </Grid> */}
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={saveGame}
                    >
                        Save
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => loadGameSave(navigate, () => notifyLoadEvent((prev) => prev + 1))}
                    >
                        Load
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={quickSaveGame}
                    >
                        Q.Save
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => setOpenYouSure(true)}
                        disabled={!localStorage.getItem("quickSave")}
                    >
                        Q.Load
                    </TextMenuButton>
                </Grid>
                <Grid
                    paddingY={0}
                >
                    <TextMenuButton
                        onClick={() => setOpenSettings(true)}
                    >
                        Prefs
                    </TextMenuButton>
                </Grid>
            </Grid >

            <ModalDialogCustom
                open={openYouSure}
                setOpen={setOpenYouSure}
                color="primary"
                head={<Typography level="h4"
                    startDecorator={<CloudDownloadIcon />}
                >
                    Load the save
                </Typography>}
                actions={<>
                    <Button
                        key={'exit'}
                        color='primary'
                        variant="outlined"
                        onClick={() => {
                            quickLoadGame(navigate, () => notifyLoadEvent((prev) => prev + 1))
                            setOpenYouSure(false)
                        }}
                        startDecorator={<CloudDownloadIcon />}
                    >
                        Confirm
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
                    Are you sure you want to load the quick save? All unsaved progress will be lost.
                </Typography>
            </ModalDialogCustom>
        </>
    );
}
