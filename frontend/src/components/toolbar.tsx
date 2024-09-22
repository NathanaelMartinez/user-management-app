import React from 'react';

interface ToolbarProps {
    onBlock: () => void;
    onUnblock: () => void;
    onDelete: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onBlock, onUnblock, onDelete }) => {
    return (
        <div className="d-flex justify-content-start">
            <button type="button" className="btn btn-secondary me-2" onClick={onBlock}>
                <i className="bi bi-lock"></i> Block
            </button>
            <button type="button" className="btn btn-secondary me-2" onClick={onUnblock}>
                <i className="bi bi-unlock"></i>
            </button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
    );
};

export default Toolbar;
