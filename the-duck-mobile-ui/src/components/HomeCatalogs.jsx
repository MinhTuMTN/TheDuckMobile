import React from "react";
import HomeCatalogItem from "./HomeCatalogItem";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import TabletIcon from '@mui/icons-material/Tablet';
import WatchIcon from '@mui/icons-material/Watch';
import FlexContainer from "./FlexContainer";

const bannerData = [
    {
        id: 1,
        title: "Điện Thoại",
        icon: <PhoneAndroidIcon />,
    },
    {
        id: 2,
        title: "Laptop",
        icon: <LaptopChromebookIcon />,
    },
    {
        id: 3,
        title: "Máy Tính Bảng",
        icon: <TabletIcon />
    },
    {
        id: 4,
        title: "Đồng Hồ Thông Minh",
        icon: <WatchIcon />
    }
]

const HomeCatalogs = () => {
    return (
        <FlexContainer justifyContent="center">
            {bannerData &&
                bannerData.map((single, key) => {
                    return (
                        <HomeCatalogItem
                            data={single}
                            key={key}
                        />
                    );
                })}
        </FlexContainer>
    );
};

export default HomeCatalogs;
