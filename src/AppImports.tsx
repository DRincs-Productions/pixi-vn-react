import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import MyThemeProvider from './providers/ThemeProvider';

type Iprops = {
    children: React.ReactNode
}

export default function AppImports(props: Iprops) {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <MyThemeProvider>
                    {props.children}
                </MyThemeProvider>
            </RecoilRoot>
        </BrowserRouter>
    );
}
