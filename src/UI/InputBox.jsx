function InputBox({ label, placeholder }) {
    return (
        <div className="flex flex-col gap-1 p-6">
            <label>{label}</label>
            <input 
                type="text" 
                placeholder={placeholder} 
                className="p-4 rounded-lg focus:outline-none border border-gray-300" 
            />
        </div>
    );
}

export default InputBox;
