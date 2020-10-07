export default {
    methods : {
        enableTab(e: KeyboardEvent): false {
            const el = e.target as HTMLTextAreaElement;
            const val = el.value;
            const carretStart = el.selectionStart;
            const carretEnd = el.selectionEnd;
            // set text area value
            el.value = `${val.substring(0, carretStart)}\t${val.substring(carretEnd)}`
            // set carret position back
            el.selectionStart = el.selectionEnd = carretStart + 1
            // prevent focus lose
            return false
        }
    }
}
