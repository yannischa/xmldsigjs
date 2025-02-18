import { XE, XmlError, XmlChildElement, XmlElement, XmlAttribute, XmlContent } from "xml-core";
import { Transform } from "../transform";
import { XmlSignature } from "../xml_names";
import { XmlSignatureObject } from "../xml_object";

@XmlElement({
    localName: XmlSignature.ElementNames.XPath,
    prefix: "",
    namespaceURI: "http://www.w3.org/2002/06/xmldsig-filter2",
})
class XPathDisplayFilterObject extends XmlSignatureObject {

    @XmlAttribute({
        localName: XmlSignature.AttributeNames.Filter,
        required: true,
    })
    public Filter: string;

    //TODO: This needs to be the content
    @XmlContent({
        required: true
    })
    public XPath: string;
}

/*
<Transform Algorithm="http://www.w3.org/2002/06/xmldsig-filter2">
    <XPath xmlns="http://www.w3.org/2002/06/xmldsig-filter2" Filter="intersect">//RenderedData</XPath>
</Transform>
*/

//N.B. This does not apply any XPath filters to the original doc, it exists only to ensure that the XPath filter information is included in the signature

export class XmlDsigDisplayFilterTransform extends Transform {

    public Algorithm: string = "http://www.w3.org/2002/06/xmldsig-filter2";

    // @XmlChildElement({
    //     localName: "XPath",
    //     required: true,
    //     parser: XPathDisplayFilterObject,
    //     prefix: "",
    //     namespaceURI: XmlSignature.NamespaceURI
    // })
    // public XPathFilter: XPathDisplayFilterObject;

    // public constructor(params?: IXmlDsigFilterTransformParams) {
    //     super();

    //     // // if (params == null)
    //     // //     throw Error("params is undefined")

    //     // this.XPathFilter = new XPathDisplayFilterObject();
    //     // // this.XPathFilter.Prefix = "";
    //     // this.XPathFilter.XPath = ""; // params.XPath;
    //     // this.XPathFilter.Filter = ""; //params.Filter;
    // }

    // public LoadXml() {

    // }

    /**
     * Returns the output of the current XmlDsigEnvelopedSignatureTransform object.
     * @returns string
     */
    public GetOutput(): any {
        if (!this.innerXml) {
            throw new XmlError(XE.PARAM_REQUIRED, "innerXml");
        }

        return this.innerXml;
    }
}

export interface IXmlDsigFilterTransformParams {
    XPath: string;
    Filter: string;
}
