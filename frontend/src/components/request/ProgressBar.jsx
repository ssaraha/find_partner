
const ProgressBar = ({ progress }) => {
    // Clamp value between 0 and 100 to avoid visual breaking
    const validatedProgress = Math.min(100, Math.max(0, progress));

    const containerStyles = {
        height: '20px',
        width: '100%',
        backgroundColor: '#e0e0de',
        borderRadius: '12px',
        overflow: 'hidden',
    };

    const fillerStyles = {
        height: '100%',
        width: `${validatedProgress}%`,
        backgroundColor: '#007bff',
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 0.2s ease-in-out', // Smooth movement animation
    };

    const labelStyles = {
        padding: '5px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '11px',
        display: 'inline-block',
    };

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                {validatedProgress > 5 && (
                    <span style={labelStyles}>{`${validatedProgress}%`}</span>
                )}
            </div>
        </div>
    );
};

export default ProgressBar;