import dynamic from "next/dynamic";

const DnDFlow = dynamic(() => import("./components/DnDFlow"), { ssr: false });

const FlowPage = ({ params }) => {
    return (
        <div>
            
            <div>
                <DnDFlow />
            </div>
        </div>
    );
};

export default FlowPage;
