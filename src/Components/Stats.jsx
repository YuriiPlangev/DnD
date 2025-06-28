import { useCharacter } from "../context/CharacterContext";
import { useState, useEffect } from "react";

const Stats = () => {
  const { character } = useCharacter();

  const baseHP = 10;
  const constitution = character.stats.constitution;
  const bonusHP = constitution > 10 ? (constitution - 10) * 3 : 0;
  const maxHP = baseHP + bonusHP;

  const manaClasses = ["Колдун", "Волшебник", "Друид"];
  const hasMana = manaClasses.includes(character.class);

  const baseMana = 30;
  const intelligence = character.stats.intelligence || 10;
  const bonusMana = intelligence > 10 ? (intelligence - 10) * 5 : 0;
  const maxMana = baseMana + bonusMana;

  const [currentHP, setCurrentHP] = useState(maxHP);
  const [currentMana, setCurrentMana] = useState(maxMana);

  useEffect(() => {
    setCurrentHP(maxHP);
  }, [maxHP]);

  useEffect(() => {
    if (hasMana) {
      setCurrentMana(maxMana);
    } else {
      setCurrentMana(0);
    }
  }, [maxMana, hasMana]);

  const decreaseHP = (amount) =>
    setCurrentHP((prev) => Math.max(prev - amount, 0));
  const increaseHP = (amount) =>
    setCurrentHP((prev) => Math.min(prev + amount, maxHP));

  const decreaseMana = (amount) =>
    setCurrentMana((prev) => Math.max(prev - amount, 0));
  const increaseMana = (amount) =>
    setCurrentMana((prev) => Math.min(prev + amount, maxMana));

  const [hpChange, setHpChange] = useState("");
  const [manaChange, setManaChange] = useState("");

  const statBlockClasses =
    "rounded-md p-3 shadow-md flex flex-col items-center justify-center";

  const buttonClasses =
    "mt-2 px-3 py-1 rounded text-white font-semibold text-xs transition-colors duration-150";

  return (
    <div className="bg-[#1E293B] border border-[#475569] rounded-md max-w-sm mx-auto text-sm">
      <p className="bg-[#445266] p-4 text-xl rounded-t-md text-white font-semibold text-center">
        Статы
      </p>
      <div className="p-4 grid grid-cols-2 gap-4">
        {/* HP */}
        <div className={`${statBlockClasses} bg-red-900 border border-red-700`}>
          <div className="uppercase text-red-300 font-semibold text-xs mb-1">
            Hit Points
          </div>
          <div className="text-3xl font-extrabold text-red-100">
            {currentHP} / {maxHP}
          </div>
          <input
            type="number"
            min="0"
            placeholder="Число"
            value={hpChange}
            onChange={(e) => setHpChange(e.target.value)}
            className="mt-2 w-full p-1.5 rounded text-black outline-none focus:ring-1 focus:ring-red-500 text-xs"
          />
          <div className="flex gap-2 mt-2 w-full justify-center">
            <button
              onClick={() => {
                const val = parseInt(hpChange);
                if (!isNaN(val) && val > 0) {
                  decreaseHP(val);
                  setHpChange("");
                }
              }}
              className={`${buttonClasses} bg-red-700 hover:bg-red-800 flex-1 max-w-[90px]`}
            >
              Урон
            </button>
            <button
              onClick={() => {
                const val = parseInt(hpChange);
                if (!isNaN(val) && val > 0) {
                  increaseHP(val);
                  setHpChange("");
                }
              }}
              className={`${buttonClasses} bg-green-700 hover:bg-green-800 flex-1 max-w-[90px]`}
            >
              Лечение
            </button>
          </div>
        </div>

        {/* Armor Class */}
        <div
          className={`${statBlockClasses} bg-blue-900 border border-blue-700`}
        >
          <div className="uppercase text-blue-300 font-semibold text-xs mb-1">
            Armor Class
          </div>
          <div className="text-3xl font-extrabold text-blue-100">
            {character.armorClass}
          </div>
        </div>

        {/* Mana */}
        {hasMana && (
          <div
            className={`${statBlockClasses} bg-purple-900 border border-purple-700 col-span-2`}
          >
            <div className="uppercase text-purple-300 font-semibold text-xs mb-1">
              Mana Points
            </div>
            <div className="text-3xl font-extrabold text-purple-100">
              {currentMana} / {maxMana}
            </div>
            <input
              type="number"
              min="0"
              placeholder="Число"
              value={manaChange}
              onChange={(e) => setManaChange(e.target.value)}
              className="mt-2 w-full p-1.5 rounded text-black outline-none focus:ring-1 focus:ring-purple-500 text-xs"
            />
            <div className="flex gap-2 mt-2 w-full justify-center">
              <button
                onClick={() => {
                  const val = parseInt(manaChange);
                  if (!isNaN(val) && val > 0) {
                    decreaseMana(val);
                    setManaChange("");
                  }
                }}
                className={`${buttonClasses} bg-purple-700 hover:bg-purple-800 flex-1 max-w-[90px]`}
              >
                Потратить
              </button>
              <button
                onClick={() => {
                  const val = parseInt(manaChange);
                  if (!isNaN(val) && val > 0) {
                    increaseMana(val);
                    setManaChange("");
                  }
                }}
                className={`${buttonClasses} bg-green-700 hover:bg-green-800 flex-1 max-w-[90px]`}
              >
                Восстановить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
