const fs = require("fs");

const jsonData = JSON.parse(fs.readFileSync("data.json", "utf8"));
let template = fs.readFileSync("template.html", "utf8");

const getIconHtml = (icon, language) => {
  switch (icon) {
    case "vegetarian":
      return '<span class="block size-6 bg-vegetarian bg-contain bg-no-repeat"></span>';
    case "spicy":
      return '<span class="block size-6 bg-spicy bg-contain bg-no-repeat"></span>';
    case "new":
      return language === "PL" ? '<span class="font-semibold text-primary whitespace-nowrap">-NOWOŚĆ-</span>' : language === "IT" ? '<span class="font-semibold text-primary whitespace-nowrap">-NUOVO-</span>' : '<span class="font-semibold text-primary whitespace-nowrap">-NEW-</span>';
    case "recommended":
      return language === "PL" ? '<span class="font-semibold text-primary whitespace-nowrap">-POLECANE-</span>' : language === "IT" ? '<span class="font-semibold text-primary whitespace-nowrap">-RACCOMANDATO-</span>' : '<span class="font-semibold text-primary whitespace-nowrap">-RECOMMENDED-</span>';
    default:
      return "";
  }
};

const generateDishHtml = (dish, language, isSubDish = false) => {
  const ingredients = dish.ingredients.find((ing) => ing[language]);
  let icons = Array.isArray(dish.icons) ? dish.icons : [dish.icons];
  let iconHtml = icons.map((icon) => getIconHtml(icon, language)).join("");
  if (dish.name == "") {
    return `
    <div class="flex flex-col gap-8 mt-${isSubDish ? "6" : "10"}">
      <div class="flex justify-between w-full gap-10 ${isSubDish ? "pl-6" : ""}">
        <div class="flex flex-col gap-0 leading-tight">
          <div class="font-semibold flex gap-1">
            <p class="font-light">${ingredients ? ingredients[language] : ""}</p>${iconHtml}
          </div>
        </div>
        <p class="font-semibold whitespace-nowrap">${dish.price}</p>
      </div>
    </div>
    ${dish.dishes ? dish.dishes.map((subDish) => generateDishHtml(subDish, language, true)).join("") : ""}
  `;
  } else {
    return `
    <div class="flex flex-col gap-8 mt-${isSubDish ? "6" : "10"}">
      <div class="flex justify-between w-full gap-10 ${isSubDish ? "pl-6" : ""}">
        <div class="flex flex-col gap-0 leading-tight">
          <div class="font-semibold flex gap-1">
            <p>${dish.name}</p>${iconHtml}
          </div>
          <p class="font-light">${ingredients ? ingredients[language] : ""}</p>
        </div>
        <p class="font-semibold whitespace-nowrap">${dish.price}</p>
      </div>
    </div>
    ${dish.dishes ? dish.dishes.map((subDish) => generateDishHtml(subDish, language, true)).join("") : ""}
  `;
  }
};

const generateSectionHtml = (section, language, sectionCount) => {
  const title = section.title.find((t) => t[language]);
  const titleDescription = section.titleDescription.find((td) => td[language]);

  return `
    <div class="hs-accordion ${sectionCount === 1 ? "active" : ""} mt-12" id="hs-heading-${sectionCount}">
      <button class="hs-accordion-toggle group w-full transition relative pr-8" aria-expanded="true" aria-controls="hs-collapse-${sectionCount}">
        <p class="text-primary/90 hs-accordion-active:text-primary hover:text-primary text-[20px] text-left transition-colors ease-in-out duration-500 font-semibold flex items-center gap-2">${title[language]}</p>
        ${titleDescription ? `<p class="text-primary/90 text-left">${titleDescription[language]}</p>` : ""}
        <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-primary absolute right-0 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-primary absolute right-0 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
      </button>
      <div id="hs-collapse-${sectionCount}" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-500 ease-in-out ${sectionCount != 1 ? "hidden" : ""}" role="region" aria-labelledby="hs-heading-${sectionCount}">
        ${section.dishes.map((dish) => generateDishHtml(dish, language)).join("")}
      </div>
    </div>
  `;
};

const generateMenuHtml = (jsonData, language) => {
  let sectionCount = 0;
  return jsonData.sections.map((section) => generateSectionHtml(section, language, ++sectionCount)).join("");
};

const generateHtmlFiles = (jsonData, template) => {
  const languages = jsonData.languages.map((lang) => lang.name);
  languages.forEach((language) => {
    const menuHtml = generateMenuHtml(jsonData, language);
    const outputHtml = template.replace("{{menu}}", menuHtml);

    const outputPath = language === "PL" ? `../../src/menu.html` : `../../src/${language}/menu.html`;
    fs.writeFileSync(outputPath, outputHtml, "utf8");

    console.log(`✅ HTML file generated: menu_${language}.html`);
  });
};

generateHtmlFiles(jsonData, template);
