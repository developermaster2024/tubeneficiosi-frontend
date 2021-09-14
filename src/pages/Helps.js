import clsx from "clsx";
import { useState } from "react";
import useHelpsCategories from "../hooks/useHelpCategories";
import useHelps from "../hooks/useHelps";

const Helps = () => {

    const [helpCategorySelected, setHelpCategorySelected] = useState(null);


    const [{ helpsCategories, total, numberOfPages, error, loading }, getHelpsCategories] = useHelpsCategories({ axiosConfig: { params: { perPage: 200 } } });



    const handleHelpCategory = (category) => {
        setHelpCategorySelected(category);
    }

    return (
        <div className="p-8 space-y-4">
            <div className="text-center text-gray-500 font-bold text-xl">
                Seleccione el tema que le interesa.
            </div>
            <div className="flex w-full space-x-4">
                <div className="w-1/4 space-y-4">
                    <div className="text-center font-bold text-xl">
                        Topicos
                    </div>
                    {
                        helpsCategories?.map((helpsCategory, i) => {
                            return (
                                <div onClick={() => { handleHelpCategory(helpsCategory) }} key={i} className={clsx(["text-center p-4 hover:shadow-xl hover:text-main rounded cursor-pointer"], {

                                })}>
                                    {helpsCategory?.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-full flex" style={{ minHeight: "50vh" }}>
                    {
                        helpCategorySelected ?
                            <div>
                                Hola
                            </div>
                            :
                            <div className="m-auto text-xl text-gray-500 text-center w-full">
                                Debe seleccionar un topico
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Helps;