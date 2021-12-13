interface Recipe {
  id: number;
  name: string;
  image?: string;
  description?: string;
  ingredients: Ingredient[]
}

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  coordinate: string;
  hold: string;
  wait: string;
  disabled: boolean;
}
