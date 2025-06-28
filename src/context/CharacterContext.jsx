import { createContext, useContext, useReducer, useEffect } from "react";

const emptySlot = {
  name: "",
  type: "",
  damage: "",
  ac: "",
  acBonus: "",
  bonus: "",
  properties: "",
};

const startingGear = {
  Варвар: {
    основнаяРука: {
      name: "Боевой топор",
      type: "Оружие",
      damage: "1к12",
      properties: "Двуручное",
    },
    дополнительныйСлот: { ...emptySlot },
    броня: {
      name: "Шкура зверя",
      type: "Броня",
      ac: 12,
      properties: "Легкая броня",
    },
    шлем: { ...emptySlot },
    сапоги: { ...emptySlot },
    перчатки: { ...emptySlot },
    украшение: { ...emptySlot },
  },
  Бард: {
    основнаяРука: {
      name: "Рапира",
      type: "Оружие",
      damage: "1к8",
      properties: "Фехтовальное, Одноручное",
    },
    дополнительныйСлот: {
      name: "Лютня",
      type: "Инструмент",
      properties: "Музыкальный фокус",
    },
    броня: {
      name: "Кожаный доспех",
      type: "Броня",
      ac: 11,
      properties: "Легкая броня",
    },
    шлем: { ...emptySlot },
    сапоги: { ...emptySlot },
    перчатки: { ...emptySlot },
  },
  Друид: {
    основнаяРука: {
      name: "Дубовый посох",
      type: "Оружие",
      damage: "1к6",
      properties: "Фокус, Одноручное",
    },
    дополнительныйСлот: {
      name: "Щит из лозы",
      type: "Броня",
      acBonus: 2,
      properties: "Деревянный",
    },
    броня: {
      name: "Кожаный доспех",
      type: "Броня",
      ac: 11,
      properties: "Легкая броня, неметаллическая",
    },
    шлем: { ...emptySlot },
    сапоги: { ...emptySlot },
    перчатки: { ...emptySlot },
  },
  Монах: {
    основнаяРука: {
      name: "Боевой посох",
      type: "Оружие",
      damage: "1к6",
      properties: "Универсальное",
    },
    дополнительныйСлот: { ...emptySlot },
    броня: { ...emptySlot },
    шлем: { ...emptySlot },
    сапоги: {
      name: "Сандалии монаха",
      type: "Одежда",
      bonus: 1,
      properties: "Ускоряет движения",
    },
    перчатки: {
      name: "Перчатки дисциплины",
      type: "Снаряжение",
      bonus: 1,
      properties: "Боевые",
    },
  },
  Паладин: {
    основнаяРука: {
      name: "Меч праведника",
      type: "Оружие",
      damage: "1к8",
      properties: "Одноручное",
    },
    дополнительныйСлот: {
      name: "Священный щит",
      type: "Броня",
      acBonus: 2,
      properties: "Фокус божества",
    },
    броня: {
      name: "Кольчужный доспех",
      type: "Броня",
      ac: 16,
      properties: "Средняя броня",
    },
    шлем: { ...emptySlot },
    сапоги: { ...emptySlot },
    перчатки: { ...emptySlot },
  },
  Колдун: {
    основнаяРука: {
      name: "Жезл теней",
      type: "Оружие",
      damage: "1к6",
      properties: "Фокус",
    },
    дополнительныйСлот: { ...emptySlot },
    броня: {
      name: "Одеяние мага",
      type: "Броня",
      ac: 10,
      properties: "Легкая ткань",
    },
    шлем: { ...emptySlot },
    сапоги: { ...emptySlot },
    перчатки: { ...emptySlot },
  },
  Волшебник: {
    основнаяРука: {
      name: "Магический посох",
      type: "Оружие",
      damage: "1к6",
      properties: "Фокус, двуручное",
    },
    дополнительныйСлот: {
      name: "Книга заклинаний",
      type: "Инструмент",
      properties: "Содержит заклинания",
    },
    броня: {
      name: "Роба волшебника",
      type: "Броня",
      ac: 10,
      properties: "Без брони",
    },
    шлем: { ...emptySlot },
    сапоги: { ...emptySlot },
    перчатки: { ...emptySlot },
  },
};
const startingInventory = [];

const defaultCharacter = {
  name: "",
  race: "Человек",
  class: "Варвар",
  level: 1,
  background: "Солдат",
  stats: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  activeGear: { ...startingGear["Варвар"] },
  nones: [],
  modifiers: {},
  hitPoints: 10,
  armorClass: 10,
  inventory: [...startingInventory],
  totalStats: {},
  classBonuses: {},
};

const CharacterContext = createContext();

const classBonusesByClass = {
  Варвар: { strength: 2, constitution: 1 },
  Бард: { dexterity: 1, charisma: 2 },
  Друид: { intelligence: 1, wisdom: 2 },
  Монах: { wisdom: 1, charisma: 2 },
  Паладин: { strength: 2 },
  Колдун: { intelligence: 2 },
  Волшебник: { intelligence: 2 },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CLASS": {
      const newClass = action.payload;
      const updatedGear = startingGear[newClass] || {};
      const classBonuses = classBonusesByClass[newClass] || {};
      return {
        ...state,
        class: newClass,
        activeGear: updatedGear,
        classBonuses,
      };
    }
    case "UPDATE_STAT": {
      const { key, value } = action.payload;
      return {
        ...state,
        stats: { ...state.stats, [key]: value },
      };
    }
    case "UPDATE_CHARACTER": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "APPLY_BONUSES": {
      const { stats, classBonuses, activeGear } = state;
      const totalStats = {};
      for (const key in stats) {
        totalStats[key] = (stats[key] || 0) + (classBonuses[key] || 0);
      }

      const gearParts = [
        "перчатки",
        "сапоги",
        "шлем",
        "броня",
        "украшение",
        "дополнительныйСлот",
      ];

      gearParts.forEach((part) => {
        const item = activeGear[part];
        if (
          item?.bonus &&
          item?.bonusTarget &&
          totalStats[item.bonusTarget] !== undefined
        ) {
          totalStats[item.bonusTarget] += parseInt(item.bonus) || 0;
        }
      });
      const modifiers = {};
      for (const key in totalStats) {
        modifiers[key] = Math.floor((totalStats[key] - 10) / 2);
      }

      const constitution = totalStats.constitution || 10;
      const hitPoints = 10 + Math.max(0, constitution - 10) * 3;

      let armorClass = 10;
      if (activeGear.броня?.ac) armorClass = Number(activeGear.броня.ac);

      if (activeGear.дополнительныйСлот?.acBonus)
        armorClass += Number(activeGear.дополнительныйСлот.acBonus);

      if (activeGear.шлем?.acBonus)
        armorClass += Number(activeGear.шлем.acBonus);

      return {
        ...state,
        totalStats,
        modifiers,
        hitPoints,
        armorClass,
      };
    }
    case "UPDATE_NOTES": {
      return {
        ...state,
        notes: action.payload,
      };
    }
    case "EQUIP_ITEM": {
      const { item, slot } = action.payload;
      const newInventory = state.inventory.filter((i) => i !== item);
      const currentEquipped = state.activeGear[slot];
      const newActiveGear = { ...state.activeGear, [slot]: item };

      return {
        ...state,
        inventory: [...newInventory, currentEquipped].filter(
          (i) => i && i.name
        ),
        activeGear: newActiveGear,
      };
    }
    case "UNEQUIP_ITEM": {
      const { slot } = action.payload;
      const item = state.activeGear[slot];
      if (!item || !item.name) return state;

      return {
        ...state,
        inventory: [...state.inventory, item],
        activeGear: {
          ...state.activeGear,
          [slot]: null,
        },
      };
    }
    case "UPDATE_INVENTORY": {
      return {
        ...state,
        inventory: action.payload,
      };
    }
    default:
      return state;
  }
};

export const CharacterProvider = ({ children }) => {
  const [character, dispatch] = useReducer(
    reducer,
    defaultCharacter,
    (initial) => {
      const saved = localStorage.getItem("character");
      if (!saved) return initial;
      const parsed = JSON.parse(saved);
      return {
        ...initial,
        ...parsed,
        stats: { ...initial.stats, ...(parsed.stats || {}) },
        modifiers: { ...initial.modifiers, ...(parsed.modifiers || {}) },
        inventory: parsed.inventory || [...startingInventory],
        classBonuses: parsed.classBonuses || {},
      };
    }
  );

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(character));
  }, [character]);

  return (
    <CharacterContext.Provider value={{ character, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
