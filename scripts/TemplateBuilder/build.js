const fs = require("fs");

const jsonData = JSON.parse(fs.readFileSync("data.json", "utf8"));
let template = fs.readFileSync("template.html", "utf8");

let sectionCount = 0;
const menuHtml = jsonData.sections
  .map((section) => {
    sectionCount++;
    return `
        <div class="hs-accordion ${sectionCount === 1 ? "active" : ""} mt-12" id="hs-heading-${sectionCount}">
          <button class="hs-accordion-toggle group w-full transition relative pr-8" aria-expanded="true" aria-controls="hs-collapse-${sectionCount}">
            <p class="text-primary/90 hs-accordion-active:text-primary hover:text-primary text-[20px] text-left transition-colors ease-in-out duration-500 font-semibold flex items-center gap-2"><span class="!size-1 max-size-1 bg-primary inline-block rounded-full"></span> ${section.title}</p>
            <p class="text-primary/90 text-left ml-4">${section.titleDescription}</p>
            <svg class="hs-accordion-active:hidden block shrink-0 size-5 text-primary absolute right-0 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            <svg class="hs-accordion-active:block hidden shrink-0 size-5 text-primary absolute right-0 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
          </button>
          <div id="hs-collapse-${sectionCount}" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-500 ease-in-out ml-3 pr-3 ${sectionCount != 1 ? "hidden" : ""}" role="region" aria-labelledby="hs-heading-${sectionCount}">
          ${section.items
            .map((item) => {
              let iconHtml = item.icons
                .map((icon) => {
                  switch (icon) {
                    case "vegetarian":
                      return '<span class="block size-6 bg-vegetarian bg-contain bg-no-repeat"></span>';
                    case "spicy":
                      return '<span class="block size-6 bg-spicy bg-contain bg-no-repeat"></span>';
                    case "new":
                      return '<span class="font-semibold text-primary whitespace-nowrap">-NOWOŚĆ-</span>';
                    case "recommended":
                      return '<span class="font-semibold text-primary whitespace-nowrap">-POLECANE-</span>';
                    default:
                      return "";
                  }
                })
                .join("");

              return `
              <div class="flex flex-col gap-8 ${item.name == "" || item.price == "" ? "mt-6" : "mt-10"} ${item.price == "" ? "ml-6" : ""}">
                <div class="flex justify-between w-full gap-10">
                  <div class="flex flex-col gap-0 leading-tight ${item.name == "" ? "ml-6" : ""}">
                    <div class="font-semibold flex gap-1">
                      <p>${item.name}</p>
                      ${iconHtml}
                    </div>
                    <p class="font-light">${item.ingredients}</p>
                  </div>
                  <p class="font-semibold whitespace-nowrap">${item.price}</p>
                </div>
              </div>`;
            })
            .join("")}
          </div>
        </div>
  `;
  })
  .join("");

const outputHtml = template.replace("{{menu}}", menuHtml);

fs.writeFileSync("../../src/menu.html", outputHtml, "utf8");

console.log("✅ HTML file generated: menu.html");
