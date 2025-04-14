"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { useSearchParams } from "next/navigation";
import SkeletonCategory from "./SkeletonCategory";

export default function ({toggleCategory,isCategoryVisible}) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subDuas, setSubDuas] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);
  const [selectedDua, setSelectedDua] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const cat_id = searchParams.get("cat");
  const subcat_id = searchParams.get("subcat");
  const dua_id = searchParams.get("dua");
  const router = useRouter();
console.log(categories);

  // Fetch all categories
  useEffect(() => {
    async function fetchCategories() {
       setLoading(true);
      try {
        const res = await fetch("https://duas-page.onrender.com/categories");
        const data = await res.json();
        setCategories(data);
        setFilteredCategories(data);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (cat_id) {
       setExpandedCategory(Number(cat_id));
      async function fetchSubCategories() {
        try {
          const res = await fetch(`https://duas-page.onrender.com/categories/${cat_id}`);
          const data = await res.json();
          setSubCategories(data || []);
        } catch (error) {
          console.error("Failed to fetch subcategories:", error);
        }
      }
      fetchSubCategories();
    } else {
      setSubCategories([]);
    }
  }, [cat_id]);

  // Fetch duas when a subcategory is selected
  useEffect(() => {
    if (cat_id && subcat_id) {
      setExpandedSubCategory(Number(subcat_id));
      async function fetchSubDuas() {
        try {
          const res = await fetch(
            `https://duas-page.onrender.com/categories/${cat_id}/subcategories/${subcat_id}/duas`
          );
          const data = await res.json();
          setSubDuas(data || []);
        } catch (error) {
          console.error("Failed to fetch duas:", error);
        }
      }
      fetchSubDuas();
    } else {
      setSubDuas([]);
    }
  }, [cat_id, subcat_id]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };


  const handleCategoryClick = (catName, catId) => {
    setExpandedCategory(catId === expandedCategory ? null : catId);
  
    // Update the URL without reloading the page
    router.push(`/${catName}/?cat=${catId}`, undefined, { shallow: true });
  };
  

  const handleSubcategoryClick = (catName, catId, subcatId,subcat_name_en) => {
    scrollToSection(`${subcat_name_en+subcatId}`);
    setExpandedSubCategory(subcatId === expandedSubCategory ? null : subcatId);
    router.push(
      `/${catName}/?cat=${catId}&subcat=${subcatId}`,
      undefined,
      { shallow: true } 
    );
    
  };
  
  const handleSubDuaClick = (catName, catId, subcatId, dua,dua_name_en) => {
    scrollToSection(dua);
    console.log(dua);
    
    setSelectedDua(dua === selectedDua ? null : dua);
    router.push(
      `/${catName}/?cat=${catId}&subcat=${subcatId}&dua=${dua}`,
      undefined,
      { shallow: true } 
    );
  };
  

  useEffect(() => {
    // Filter categories based on search input
    const filtered = categories.filter((category) =>
      category.cat_name_en.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchValue]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  

  return (
    <>
<section
  className={`fixed top-0 left-0 h-screen w-full max-w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
    isCategoryVisible ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0 lg:relative lg:h-[85vh] lg:min-w-[400px] lg:max-w-[400px] lg:rounded-t-lg overflow-hidden scrollbar-none`}
>
  <div className="">
    <h2 className="font-medium text-lg text-center text-white bg-customGreen  p-[14px]">
      Categories
    </h2>
    <form className="relative w-full max-w-[400px] p-3">
      <input
        type="text"
        placeholder="Search Categories"
        value={searchValue}
        onChange={handleSearch}
        className="w-full px-4 py-[11px] pl-11 border border-gray-200 rounded-md shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-12 rounded-md flex items-center justify-center">
        <IoSearchOutline className="text-gray-600 text-xl" />
      </div>
    </form>
    <RxCrossCircled  onClick={toggleCategory} className="absolute top-2 right-2 text-2xl text-white font-semibold lg:hidden"/> 
  </div>
  <div className="overflow-y-auto h-full px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-28">
    {/* Render Categories */}
    {loading ? (
      <SkeletonCategory />
    ) : (
      <ul>
        {filteredCategories.map((category) => (
          <li key={category.cat_id} className="mb-4">
            <button
              onClick={() => handleCategoryClick(category.cat_name_en, category.cat_id)}
              className={`flex items-center justify-between space-x-4 px-4 py-3 hover:bg-customLiteBlue rounded-lg w-full ${
                expandedCategory === category.cat_id ? "bg-customLiteBlue" : ""
              }`}
            >
              <div className="rounded-sm flex justify-center items-center flex-row gap-4">
                <img
                  src={`/cat_icon/${category.cat_icon}.svg`}
                  alt={`Category Icon`}
                  className="w-12 h-12 bg-white p-2"
                />
              <div className="text-left float-left w-full">
                <h3 className={`text-lg font-semibold ${
                expandedCategory === category.cat_id ? "text-customGreen" : ""
              }`}>{category.cat_name_en}</h3>
                <p className="text-sm text-gray-500">
                  Subcategories: {category.no_of_subcat}
                </p>
              </div>
              </div>
              <div className="flex flex-col">
                 <span className="font-semibold">{category.no_of_dua}</span>
                 <span className="text-gray-600">Duas</span>
              </div>
            </button>
            {/* Render Subcategories */}
            {expandedCategory === category.cat_id && (
              <ul className="flex flex-col space-y-2 ml-8 border-l-2 border-dotted my-2 border-customGreen">
                {subCategories.map((subCat) => (
                  <div
                    key={subCat.subcat_id}
                    className="flex flex-col justify-start items-start gap-y-2 ml-3 cursor-pointer"
                  >
                    <div className="flex flex-row my-2">
                      <div className="bg-customGreen -translate-x-4 mt-1.5 w-1.5 rounded-full h-1.5"></div>
                      <div>
                        <span
                          onClick={() =>
                            handleSubcategoryClick(
                              category.cat_name_en,
                              subCat.cat_id,
                              subCat.subcat_id,
                              subCat.subcat_name_en
                            )
                          }
                          className={`font-semibold text-sm ${
                            expandedSubCategory === subCat.subcat_id
                              ? "text-customGreen"
                              : "text-gray-800"
                          }`}
                        >
                          {subCat.subcat_name_en}
                        </span>
                        {/* Render Duas */}
                        {expandedSubCategory === subCat.subcat_id && (
                          <div className="flex flex-col space-y-4 mt-4 text-sm">
                            {subDuas.map((dua) => (
                              <div
                                key={dua.dua_id}
                                className="flex flex-row"
                                onClick={() =>
                                  handleSubDuaClick(
                                    category.cat_name_en,
                                    category.cat_id,
                                    subCat.subcat_id,
                                    dua.dua_id,
                                    dua.dua_name_en
                                  )
                                }
                              >
                                <img
                                  src="/duaarrow.svg"
                                  className="-translate-y-1 mr-2"
                                />
                                <span
                                  className={`${
                                    selectedDua === dua.id ||
                                    Number(dua_id) === dua.id
                                      ? "text-customGreen"
                                      : ""
                                  } font-normal`}
                                >
                                  {dua.dua_name_en}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
   {/* Background Overlay (Mobile Only) */}
</section>
      {isCategoryVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleCategory}
        />)}
</>

  );
}
