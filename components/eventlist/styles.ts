export const styles: { [key: string]: React.CSSProperties } = {
    imgContainer: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll'
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 5,
        cursor: 'pointer',
        border: '3px solid transparent',
        boxSizing: 'border-box'
    },
    imgSelected: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 5,
        cursor: 'pointer',
        border: '3px solid orange',
        boxSizing: 'border-box'
    }
}