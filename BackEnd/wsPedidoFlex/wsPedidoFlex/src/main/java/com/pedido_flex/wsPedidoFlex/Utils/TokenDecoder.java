package com.pedido_flex.wsPedidoFlex.Utils;

//import java.util.ArrayList;
//import java.util.List;
//import org.apache.commons.codec.binary.Base64;
//import org.springframework.stereotype.Component;
//import com.google.gson.JsonArray;
//import com.google.gson.JsonElement;
//import com.google.gson.JsonObject;
//import com.google.gson.JsonParser;
//import org.springframework.beans.factory.annotation.Value;
//
///**
// * Implementación de un decoder de token JWT
// *
// */
//@Component
public class TokenDecoder {
//
//    @Value("${wslogin.token.tag.realmaccess}")
//    private String REALM_ACCESS;
//    @Value("${wslogin.token.tag.preferredusername}")
//    private String PREFERRED_USERNAME;
//    @Value("${wslogin.token.tag.roles}")
//    private String ROLES;
//    @Value("${wslogin.token.tag.idpersona}")
//    private String ID_PERSONA;
//    @Value("${wslogin.token.tag.givenname}")
//    private String GIVEN_NAME;
//    @Value("${wslogin.token.tag.familyname}")
//    private String FAMILY_NAME;
//    @Value("${wslogin.token.tag.apps}")
//    private String APPS;
//    @Value("${wslogin.token.tag.area}")
//    private String AREA;
//    @Value("${wslogin.token.tag.facerecognitionrequired}")
//    private String FACERECOGNITIONREQUIRED;
//    @Value("${wslogin.token.tag.idgrupo}")
//    private String ID_GRUPO;
//    /**
//     * Retrieves the encoded body from a given JWT token.
//     *
//     * @param  jwtToken  the JWT token from which to retrieve the encoded body
//     * @return           the decoded body of the JWT token
//     */
//    private String getEncodedBody(String jwtToken) {
//        String[] split_string = jwtToken.split(Constants.TOKEN_SPLIT);
//        String base64EncodedBody = split_string[1];
//        Base64 base64Url = new Base64(true);
//        String body = new String(base64Url.decode(base64EncodedBody));
//        return body;
//    }
//
//    /**
//     * Retrieves the roles associated with the user from the given JWT token.
//     *
//     * @param  jwtToken  the JSON Web Token used to authenticate the user
//     * @return           a list of strings representing the user's roles
//     */
//    public List<String> getUserRoles(String jwtToken) {
//        List<String> roles = new ArrayList<String>();
//        JsonParser parser = new JsonParser();
//        JsonObject JSONObject = parser.parse(getEncodedBody(jwtToken)).getAsJsonObject();
//        JsonArray array = JSONObject.getAsJsonObject(REALM_ACCESS).getAsJsonArray(ROLES);
//        for (JsonElement jsonElement : array) {
//            roles.add(jsonElement.getAsString());
//        }
//        return roles;
//    }
//
//    /**
//     * Retrieves the username from a JWT token.
//     *
//     * @param  jwtToken  the JWT token from which to retrieve the username
//     * @return           the username extracted from the JWT token
//     */
//    public String getUserName(String jwtToken) {
//        JsonParser parser = new JsonParser();
//        JsonObject JSONObject = parser.parse(getEncodedBody(jwtToken)).getAsJsonObject();
//        return JSONObject.get(PREFERRED_USERNAME).getAsString();
//    }
//
//    /**
//     * Retrieves the ID of a persona from a JWT token.
//     *
//     * @param  jwtToken  the JWT token containing the encoded body
//     * @return           the ID of the persona, or an empty string if the ID is null
//     */
//    public String getidPersona(String jwtToken) {
//        JsonParser parser = new JsonParser();
//        JsonObject JSONObject = parser.parse(getEncodedBody(jwtToken)).getAsJsonObject();
//        String result = JSONObject.get(ID_PERSONA).getAsString();
//        return result != null ? result : Constants.EMPTY_STRING;
//    }
//
//    /**
//     * Retrieves the first name of the user from a JWT token.
//     *
//     * @param  jwtToken  the JWT token containing user information
//     * @return           the first name of the user, or an empty string if not found
//     */
//    public String getUserFirstName(String jwtToken) {
//        JsonParser parser = new JsonParser();
//        JsonObject JSONObject = parser.parse(getEncodedBody(jwtToken)).getAsJsonObject();
//        String result = JSONObject.get(GIVEN_NAME).getAsString();
//        return result != null ? result : Constants.EMPTY_STRING;
//    }
//
//    /**
//     * Retrieves the last name of the user from the provided JWT token.
//     *
//     * @param  jwtToken  the JWT token containing the user information
//     * @return           the last name of the user as a string, or an empty string if the last name is not available
//     */
//    public String getUserLastName(String jwtToken) {
//        JsonParser parser = new JsonParser();
//        JsonObject JSONObject = parser.parse(getEncodedBody(jwtToken)).getAsJsonObject();
//        String result = JSONObject.get(FAMILY_NAME).getAsString();
//        return result != null ? result : Constants.EMPTY_STRING;
//    }
//
//    /**
//     * Retrieves a list of apps associated with the user from the given JWT token.
//     *
//     * @param  jwtToken  the JSON Web Token used for authentication
//     * @return           a list of apps
//     */
//    public List<String> getAppsList(String jwtToken) {
//        List<String> apps = new ArrayList<String>();
//        JsonParser parser = new JsonParser();
//        JsonObject JSONObject = parser.parse(getEncodedBody(jwtToken)).getAsJsonObject();
//        JsonArray array = JSONObject.get(APPS).getAsJsonArray();
//        for (JsonElement jsonElement : array) {
//            apps.add(jsonElement.getAsString());
//        }
//        return apps;
//    }
//
//    /**
//     * Retrieves the list of areas from the given JWT token.
//     *
//     * @param  jwtToken  the JWT token used to retrieve the areas
//     * @return           the list of areas retrieved from the token
//     */
//    public List<String> getArea(String jwtToken) {
//        List<String> area = new ArrayList<String>();
//        JsonParser parser = new JsonParser();
//        JsonObject JSONObject = parser.parse(getEncodedBody(jwtToken)).getAsJsonObject();
//        JsonArray array = JSONObject.get(AREA).getAsJsonArray();
//        for (JsonElement jsonElement : array) {
//            area.add(jsonElement.getAsString());
//        }
//        return area;
//    }
//
//    /**
//     * Retrieves the value of the face recognition required flag from the provided JWT token.
//     *
//     * @param  jwtToken  the JWT token containing the encoded body
//     * @return           true if the face recognition is required, false otherwise
//     */
//    public boolean getFaceRecognitionRequired(String jwtToken) {
//        JsonParser parser = new JsonParser();
//        JsonObject JsonObject = parser.parse(getEncodedBody(jwtToken)).getAsJsonObject();
//        if (JsonObject.get(FACERECOGNITIONREQUIRED) != null) {
//            return JsonObject.get(FACERECOGNITIONREQUIRED).getAsBoolean();
//        } else {
//            return true;
//        }
//    }
//
//    /**
//     * Retrieves the grupo ID from the given JSON Web Token.
//     *
//     * @param  jwToken  the JSON Web Token containing the grupo ID
//     * @return          the grupo ID as a Long value
//     */
//    public Long getGrupoId(String jwToken) {
//        JsonParser parser = new JsonParser();
//        JsonObject JsonObject = parser.parse(getEncodedBody(jwToken)).getAsJsonObject();
//        return JsonObject.get(ID_GRUPO).getAsLong();
//    }
}

