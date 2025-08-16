import categoryData from "../../data/categories.json" with { type: "json" };

const getCategories = () => {
  return categoryData.categories;
};

export default getCategories;
