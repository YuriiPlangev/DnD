import { useCharacter } from "../context/CharacterContext";

const Portrait = () => {
  const portraits = {
    Человек: "./src/assets/human.jpg",
    Эльф: "./src/assets/elf.jpg",
    Гном: "./src/assets/gnom.jpg",
    Полурослик: "./src/assets/halfling.jpg",
    Драконорожденный: "./src/assets/dragonborn.jpg",
    Дварф: "./src/assets/dwarf.jpg",
    Полуэльф: "./src/assets/halfelf.jpg",
    Полуорк: "./src/assets/halforc.jpg",
    Тифлинг: "./src/assets/tiffling.jpg",
  };

  const { character } = useCharacter();

  const imgSrc = portraits[character.race];

  return (
    <div className="bg-[#1E293B] border border-[#475569] rounded-lg flex flex-col">
      <p className="bg-[#445266] p-6 text-2xl rounded-lg text-white">
        Портрет Персонажа
      </p>
      <div className="p-6 flex-grow flex">
        <div className="border-4 border-[#64748B] rounded-lg p-6 bg-[#435165] w-full flex items-center justify-center">
          <img
            className="w-full rounded-lg "
            src={imgSrc}
            alt={character.race}
          />
        </div>
      </div>
    </div>
  );
};

export default Portrait;
