import { fetch } from "@/libraries/axios";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";
import { BoxProductSimple } from "@/components/store/BoxProductSimple";

const StorePage = () => {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        fetch.get('/products').then((result: any) => {
            setProducts(result.products);
        });
    }, []);

    return (
        <SinglePage title="Cửa hàng">
            <Stack direction="row" flexWrap="wrap" overflow="auto" marginTop={0}>
                {products.map((product: any) => <BoxProductSimple product={product} key={product.id} />)}
            </Stack>
        </SinglePage>
    );
}

export default StorePage;
