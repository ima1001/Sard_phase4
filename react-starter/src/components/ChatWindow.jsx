

// function ChatWindow({ chat }) {
//     const message = [/* */];

//     return (
//         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px'}}>

//             {/* data pill */}
//             <div style={{ textAlign: 'center', marginBottom: '16px'}}>
//                 <span style={{ background: '#ccc', borderRadius: '12px', padding: '4px 12px', fontSize: '12px' }}>
//                     Today
//                 </span>
//             </div>

//             {/* messages */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}
//                 {message.map(msg => (
//                     msg.form === 'me'
//                         ? <S
//                 ))}
//     )
// }

function SentMessage({ msg }) {
    return (
        <div style={{ background: '#2d3a4a', color: 'white', borderRadius: '16px', padding: '10px 14px' }}>
            <div style={{ fontSize: '11px', color: '#aaa', textAlign: 'right', marginTop: '4px'}}>{msg.time}
                {msg.text}
            </div>
            <div style={{ fontSize: '11px', color: '#aaa', textAlign: 'right', marginTop: '4px' }}>{msg.time}</div>
        </div>
    );
}

function ReceivedMessage({ msg }) {
    return (
        <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            {/* avatar circle}
        </div>
    )
}