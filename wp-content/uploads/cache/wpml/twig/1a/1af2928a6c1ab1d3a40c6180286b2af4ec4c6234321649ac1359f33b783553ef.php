<?php

/* st-db-cache-tables.twig */
class __TwigTemplate_d029f59b8abc56f74ba54283c1e79af54c1abbc6758ebe1b6bcc09ade58b275e extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<p>
    <input id=\"icl_run_st_db_cache_command\"
           type=\"button\" class=\"button-secondary\"
           value=\"";
        // line 4
        echo twig_escape_filter($this->env, (isset($context["buttonLabel"]) ? $context["buttonLabel"] : null), "html", null, true);
        echo "\"
           data-success-message=\"";
        // line 5
        echo twig_escape_filter($this->env, (isset($context["successMsg"]) ? $context["successMsg"] : null), "html", null, true);
        echo "\"
           data-nonce=\"";
        // line 6
        echo twig_escape_filter($this->env, (isset($context["nonce"]) ? $context["nonce"] : null), "html", null, true);
        echo "\"
    />
    <br/>
    <small style=\"margin-left:10px;\">";
        // line 9
        echo twig_escape_filter($this->env, (isset($context["description"]) ? $context["description"] : null), "html", null, true);
        echo "</small>
</p>";
    }

    public function getTemplateName()
    {
        return "st-db-cache-tables.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  38 => 9,  32 => 6,  28 => 5,  24 => 4,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "st-db-cache-tables.twig", "C:\\xampp\\htdocs\\pearson-master\\wp-content\\plugins\\wpml-string-translation\\templates\\troubleshooting\\st-db-cache-tables.twig");
    }
}
