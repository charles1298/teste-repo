import { useState, useEffect } from 'react';

export interface InventoryData {
  ownedWeapons: string[];
  materials: Record<string, number>;
}

const STORAGE_KEY = 'arc-raiders-inventory';

const defaultInventory: InventoryData = {
  ownedWeapons: [],
  materials: {}
};

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryData>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(STORAGE_KEY);
        return item ? JSON.parse(item) : defaultInventory;
      }
      return defaultInventory;
    } catch (error) {
      console.warn("Error reading localStorage", error);
      return defaultInventory;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
      }
    } catch (error) {
      console.warn("Error setting localStorage", error);
    }
  }, [inventory]);

  const toggleWeapon = (weaponId: string) => {
    setInventory(prev => {
      const isOwned = prev.ownedWeapons.includes(weaponId);
      return {
        ...prev,
        ownedWeapons: isOwned 
          ? prev.ownedWeapons.filter(id => id !== weaponId)
          : [...prev.ownedWeapons, weaponId]
      };
    });
  };

  const updateMaterial = (materialName: string, amount: number) => {
    setInventory(prev => {
      const newMaterials = { ...prev.materials };
      if (amount <= 0) {
        delete newMaterials[materialName];
      } else {
        newMaterials[materialName] = amount;
      }
      return {
        ...prev,
        materials: newMaterials
      };
    });
  };

  return {
    inventory,
    toggleWeapon,
    updateMaterial
  };
};
