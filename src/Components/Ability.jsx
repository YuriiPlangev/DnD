const Ability = ({ name, value, bonus, onChange }) => {
  return (
    <div className="bg-[#334155] border-2 border-[#64748B] rounded-lg flex flex-col items-center p-2">
      <p className="text-xs font-semibold text-slate-300 uppercase mb-1">
        {name}
      </p>
      <div className="flex flex-col items-center gap-2">
        <input
          type="number"
          min={8}
          max={20}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="text-2xl font-bold text-slate-100 bg-[#334155] w-16 text-center rounded outline-none border border-transparent focus:border-slate-400"
        />
        <div className="flex flex-col items-center">
          {bonus !== 0 && (
            <p className="text-xs text-emerald-400">{`бонус: ${
              bonus > 0 ? `+${bonus}` : bonus
            }`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ability;
