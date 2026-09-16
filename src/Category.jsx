import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { TbSoup } from "react-icons/tb";
import { CiBowlNoodles } from "react-icons/ci";
import { MdOutlineFoodBank } from "react-icons/md";
import { GiFullPizza } from "react-icons/gi";
import { GiHamburger } from "react-icons/gi";


export const Categories = [
    {
        id: 1,
        name:"All",
        icon:<TiThSmallOutline className="w-15 h-15 text-green-600"/>
    },
     {
        id: 2,
        name:"Breakfast",
        icon:<MdOutlineFreeBreakfast className="w-15 h-15 text-green-600"/>
    },
      {
        id: 3,
        name:"Soups",
        icon:<TbSoup className="w-15 h-15 text-green-600"/>
    },
       {
        id: 4,
        name:"Pasta",
        icon:<CiBowlNoodles className="w-15 h-15 text-green-600"/>
    },
        {
        id: 5,
        name:"Main_course",
        icon:<MdOutlineFoodBank className="w-15 h-15 text-green-600"/>
    },
         {
        id: 6,
        name:"Pizza",
        icon:<GiFullPizza className="w-15 h-15 text-green-600"/>
    },
          {
        id: 7,
        name:"Burger",
        icon:<GiHamburger className="w-15 h-15 text-green-600"/>
    },
]
export default Categories