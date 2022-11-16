import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Car Service`;
    }, [title])
}

export default useTitle;