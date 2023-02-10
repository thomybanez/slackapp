

export default function HandleChange(e, callback) {
    callback(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value
    }))
}