import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { afterLoadEventState } from './atoms/afterLoadEventState';
import { addRefreshSave, loadRefreshSave } from './utility/ActionsUtility';
import { useMyNavigate } from './utility/useMyNavigate';

export default function EventInterceptor() {
    const notifyLoadEvent = useSetRecoilState(afterLoadEventState);
    const navigate = useMyNavigate();

    useEffect(() => {
        loadRefreshSave(navigate, () => notifyLoadEvent((prev) => prev + 1))
        window.addEventListener("beforeunload", addRefreshSave);
        window.addEventListener("popstate", onpopstate);
        return () => {
            window.removeEventListener("beforeunload", addRefreshSave);
            window.removeEventListener("popstate", onpopstate);
        };
    }, []);

    function onpopstate() {
        window.history.forward();
    }

    return null
}
