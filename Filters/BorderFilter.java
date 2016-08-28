/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Filters;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.post.Filter;
import com.jme3.renderer.RenderManager;
import com.jme3.renderer.ViewPort;
import com.jme3.texture.Texture;

public class BorderFilter extends Filter {

    private Texture glare;

    public BorderFilter() {
        super("BorderFilter");
    }

    /**
     * @see com.jme3.post.Filter#initFilter(com.jme3.asset.AssetManager,
     * com.jme3.renderer.RenderManager, com.jme3.renderer.ViewPort, int, int)
     */
    @Override
    protected void initFilter(final AssetManager manager, final RenderManager renderManager, final ViewPort vp, final int w, final int h) {
        material = new Material(manager, "Dingo/MatDefs/Border/Border.j3md");
        glare = manager.loadTexture("Dingo/Textures/Border/default.png");

        material.setTexture("border", glare);
        
    }

    /**
     * @return 
     * @see com.jme3.post.Filter#getMaterial()
     */
    @Override
    protected Material getMaterial() {
        return material;
    }

    public Texture getGlare() {
        return glare;
    }

    public void setGlare(Texture glare) {
        this.glare = glare;
    }  
    
}