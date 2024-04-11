import { Route, Routes } from 'react-router-dom';
import AppImports from './AppImports';
import Dialogue from './screens/Dialogue';
import History from './screens/History';
import MainMenu from './screens/MainMenu';
import QuickActions from './screens/QuickActions';
import Settings from './screens/Settings';

function App() {
    return (
        <AppImports>
            <Routes>
                <Route key={"main_menu"} path={"/"} element={<MainMenu />} />
                <Route key={"game"} path={"/game"}
                    element={<>
                        <QuickActions />
                        <Dialogue />
                    </>}
                />
            </Routes>
            <Settings />
            <History />
        </AppImports>
    )
}

export default App
