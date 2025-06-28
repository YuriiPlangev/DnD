import Ability from "./Ability";
import { useCharacter } from "../context/CharacterContext";

const AbilityScores = () => {
  const { character, dispatch } = useCharacter();

  const characteristics = [
    { key: "strength", name: "Сила" },
    { key: "dexterity", name: "Ловкость" },
    { key: "constitution", name: "Телосложение" },
    { key: "intelligence", name: "Интеллект" },
    { key: "wisdom", name: "Мудрость" },
    { key: "charisma", name: "Харизма" },
  ];

  const updateStat = (key, newValue) => {
    dispatch({ type: "UPDATE_STAT", payload: { key, value: newValue } });
    dispatch({ type: "APPLY_BONUSES" });
  };

  return (
    <div className="bg-[#1E293B] border border-[#475569] rounded-lg">
      <div className="bg-[#445266] p-6 text-2xl rounded-lg flex items-center justify-between">
        <p>Характеристики</p>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {characteristics.map(({ key, name }) => (
          <Ability
            key={key}
            name={name}
            value={character.totalStats[key] || character.stats[key]}
            bonus={
              (character.totalStats[key] || character.stats[key]) -
              character.stats[key]
            }
            onChange={(val) => updateStat(key, val)}
          />
        ))}
      </div>
    </div>
  );
};

export default AbilityScores;
