const NftCard = ({ image, id, title, address, description, attributes }) => {
    return (
        <div className="w-1/4 mb-4 mr-3 rounded-md bg-slate-100">
            <img className="w-full rounded-t-md" key={id} src={image}></img>
            <div className="p-3">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h3 className="text-xl">{title}</h3>
                        <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p>
                    </div>
                    <div className="flex mr-3">
                        <a
                            target="_blank"
                            className="text-blue-700"
                            href={`https://etherscan.io/token/${address}`}
                        >{`${address.slice(0, 4)}...${address.slice(
                            address.length - 4
                        )}`}</a>
                    </div>
                </div>
                <p>{description ? description.slice(0, 200) : "No Description"}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center p-3 ">
                {attributes?.length > 0 &&
                    attributes.map((attribute) => {
                        return (
                            <div className="flex flex-col justify-start w-1/2 mb-2">
                                <p className="mr-2 font-bold">{attribute.trait_type}:</p>
                                <p className="text-sm">{attribute.value}</p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default NftCard;