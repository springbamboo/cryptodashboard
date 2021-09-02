// メインページ
import React from "react";
import Header from "../components/Header";
import CurrencySwitchButton from "../components/CurrencySwitchButton";
import DataTable from "../components/DataTable";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <CurrencySwitchButton />
                <DataTable />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
