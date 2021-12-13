export interface RecipesAPI {
  getRecipes: () => Promise<any>,
  getIngredients: () => Promise<any>
}

export const recipesApi = (): RecipesAPI => {

  async function fetchFile(file: string) {
    const response: any = await fetch(`assets/data/${file}.json`);
    return await response.json();
  }

  async function getRecipes() {
    return fetchFile('recipes');
  }

  async function getIngredients() {
    return fetchFile('ingredients');
  }

  return {
    getRecipes: getRecipes,
    getIngredients: getIngredients
  };

}
