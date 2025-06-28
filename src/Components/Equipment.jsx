import { useCharacter } from "../context/CharacterContext";

const Equipment = () => {
  const { character, dispatch } = useCharacter();

  const unequipItem = (slot) => {
    dispatch({ type: "UNEQUIP_ITEM", payload: { slot } });
    dispatch({ type: "APPLY_BONUSES" });
  };

  const gearSlots = [
    "основнаяРука",
    "дополнительныйСлот",
    "броня",
    "перчатки",
    "шлем",
    "сапоги",
    "украшение",
  ];

  return (
    <div className="bg-[#1E293B] border border-[#475569] rounded-lg flex flex-col">
      <div className="border border-slate-600 shadow-xl bg-slate-800 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-4">
          <h2 className="text-slate-100 text-lg font-semibold flex items-center">
            Активное Снаряжение
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {gearSlots.map((slot) => {
            const item = character.activeGear[slot];

            return (
              <div
                key={slot}
                className="bg-slate-700 border border-slate-600 rounded-lg p-3"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-semibold text-slate-300 uppercase">
                    {slot}
                  </div>
                  {item?.type && (
                    <span className="text-xs bg-slate-600 text-slate-200 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  )}
                </div>

                {item ? (
                  <>
                    <div className="font-semibold text-slate-100 mb-1">
                      {item.name}
                    </div>
                    <div className="text-sm text-slate-400 space-y-1 mb-2">
                      {item.damage && <div>Урон: {item.damage}</div>}
                      {item.ac && <div>Броня: {item.ac}</div>}
                      {item.acBonus && <div>Бонус к AC: {item.acBonus}</div>}
                      {item.bonus && (
                        <div>
                          Бонус: +{item.bonus}
                          {item.bonusTarget && ` к ${item.bonusTarget}`}
                        </div>
                      )}
                    </div>

                    {item && item.name ? (
                      <button
                        onClick={() =>
                          dispatch({ type: "UNEQUIP_ITEM", payload: { slot } })
                        }
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded"
                      >
                        Снять
                      </button>
                    ) : null}
                  </>
                ) : (
                  <div className="text-slate-500 text-sm italic">Пусто</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Equipment;
