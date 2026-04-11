

function ChatWindow({ chat }) {
    const message = [/* */];

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px'}}>

            {/* data pill */}
            <div style={{ textAlign: 'center', marginBottom: '16px'}}>
                <span style={{ background: '#ccc', borderRadius: '12px', padding: '4px 12px', fontSize: '12px' }}>
                    Today
                </span>
            </div>

            {/* messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}
                {message.map(msg => (
                    msg.form === 'me'
                        ? <S
                ))}
    )
}